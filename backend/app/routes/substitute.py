from fastapi import APIRouter, Query, HTTPException
from backend.app.services.flavordb import flavordb_client
from backend.app.models.schemas import SubstituteResponse

router = APIRouter(tags=["FlavorDB Substitutions"])

@router.get("/substitute", response_model=SubstituteResponse)
async def get_ingredient_substitutes(ingredient: str = Query(..., description="Ingredient name to find molecular substitutes for")):
    """
    Queries FlavorDB for molecular substitutes sharing volatile aroma compounds.
    """
    subs = await flavordb_client.get_substitutions(ingredient)
    profile = await flavordb_client.get_entity_profile(ingredient)
    compounds = profile.get("volatile_compounds", []) if profile else []

    return SubstituteResponse(
        query_ingredient=ingredient,
        substitutions=subs,
        shared_compounds=compounds,
        source="flavordb_molecular_profile"
    )
