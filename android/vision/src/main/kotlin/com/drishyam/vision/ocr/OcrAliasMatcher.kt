package com.drishyam.vision.ocr

object OcrAliasMatcher {

    // Exclusion patterns: prepared condiments, sauces, and ready-to-eat products that should NOT match raw spice pantry items
    private val exclusions = listOf(
        "sauce", "chutney", "ketchup", "pickle", "achar", "paste", "puree",
        "flavoured", "flavored", "instant noodles", "chips", "dressing"
    )

    // Latin & Devanagari alias dictionary mapping to canonical ingredient names
    private val aliasDictionary: List<Pair<List<String>, String>> = listOf(
        listOf("haldi", "हल्दी", "turmeric", "curcuma") to "turmeric",
        listOf("jeera", "जीरा", "cumin", "zeera") to "cumin",
        listOf("dhaniya", "धनिया", "coriander", "cilantro seed") to "coriander",
        listOf("lal mirch", "लाल मिर्च", "red chilli", "red chili", "chilli powder", "chili powder", "mirch powder") to "red chilli",
        listOf("garam masala", "गरम मसाला", "garam massala") to "garam masala",
        listOf("namak", "नमक", "salt", "sendha namak", "rock salt") to "salt",
        listOf("sarson", "सरसों", "rai", "राई", "mustard seed", "mustard seeds") to "mustard seeds",
        listOf("methi", "मेथी", "fenugreek", "kasuri methi", "kasoori methi") to "fenugreek",
        listOf("hing", "हींग", "asafoetida", "asafetida") to "asafoetida",
        listOf("ajwain", "अजवाइन", "carom seed", "carom seeds") to "carom seeds",
        listOf("saunf", "सौंफ", "fennel", "fennel seed", "fennel seeds") to "fennel seeds",
        listOf("elaichi", "इलायची", "cardamom", "green cardamom", "badi elaichi") to "cardamom",
        listOf("laung", "लौंग", "clove", "cloves") to "cloves",
        listOf("dalchini", "दालचीनी", "cinnamon", "cassia") to "cinnamon",
        listOf("adrak", "अदरक", "ginger", "saunth", "dry ginger") to "ginger",
        listOf("lehsun", "लहसुन", "garlic", "garlic powder") to "garlic",
        listOf("pyaz", "प्याज", "onion") to "onion",
        listOf("tamatar", "टमाटर", "tomato") to "tomato",
        listOf("paneer", "पनीर", "cottage cheese") to "paneer"
    )

    /**
     * Matches raw OCR text lines against the bilingual culinary dictionary.
     * Brand words (e.g., MDH, Everest, Catch, Tata) and pack weights (e.g., 100g) are ignored.
     * Excluded words (e.g. sauce, chutney) prevent false positives.
     */
    fun match(ocrText: String): String? {
        val normalized = ocrText.lowercase().trim()

        // 1. Check exclusions
        for (ex in exclusions) {
            if (normalized.contains(ex)) {
                return null
            }
        }

        // 2. Match aliases (order by longest alias pattern first to match multi-word spices accurately)
        for ((aliases, canonical) in aliasDictionary) {
            val sortedAliases = aliases.sortedByDescending { it.length }
            for (alias in sortedAliases) {
                val pattern = Regex("\\b${Regex.escape(alias)}\\b", RegexOption.IGNORE_CASE)
                if (pattern.containsMatchIn(normalized) || normalized.contains(alias)) {
                    return canonical
                }
            }
        }

        return null
    }
}
