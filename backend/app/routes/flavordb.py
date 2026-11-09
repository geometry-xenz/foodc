from fastapi import APIRouter, Query, HTTPException
from backend.app.services.flavordb import flavordb_client
from backend.app.models.schemas import SubstituteResponse

router = APIRouter(tags=["FlavorDB Molecular Profiles"])

@router.get("/flavour/{ingredient}")
async def get_ingredient_flavour_profile(ingredient: str):
    profile = await flavordb_client.get_entity_profile(ingredient)
    if not profile:
        raise HTTPException(status_code=404, detail=f"No FlavorDB profile found for '{ingredient}'.")
    return profile

@router.get("/substitute", response_model=SubstituteResponse)
async def get_ingredient_substitutes(ingredient: str = Query(..., description="Ingredient name to find molecular substitutes for")):
    subs = await flavordb_client.get_substitutions(ingredient)
    profile = await flavordb_client.get_entity_profile(ingredient)
    compounds = profile.get("volatile_compounds", []) if profile else []

    return SubstituteResponse(
        query_ingredient=ingredient,
        substitutions=subs,
        shared_compounds=compounds,
        source="flavordb_molecular_profile"
    )
