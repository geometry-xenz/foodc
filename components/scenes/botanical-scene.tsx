import { Beaker, Leaf, Sparkles } from "lucide-react";
import { entities, getScientificName } from "@/lib/flavor";

const CARD_DATA = [
  {
    key: "turmeric",
    name: "Turmeric",
    family: "Zingiberaceae",
    accent: "#E9A23B",
    glow: "rgba(233,162,59,.18)",
    compounds: ["curcumin", "ar-turmerone", "curcumenol", "zingiberene"],
    oils: "Curcuminoids · 3–5% of rhizome",
    note: "Earthy, warm and woody. Curcumin carries the golden colour; turmerones carry the bitter aromatic lift.",
  },
  {
    key: "cumin",
    name: "Cumin",
    family: "Apiaceae",
    accent: "#C58B53",
    glow: "rgba(197,139,83,.16)",
    compounds: ["cuminaldehyde", "pinene", "myrcene", "beta-caryophyllene"],
    oils: "Cuminaldehyde · 35–60% of oil",
    note: "Nutty, pungent and warm. Cuminaldehyde defines the recognisable jeera signature.",
  },
  {
    key: "cloves",
    name: "Cloves",
    family: "Myrtaceae",
    accent: "#D9784A",
    glow: "rgba(217,120,74,.17)",
    compounds: ["eugenol", "eugenyl acetate", "beta-caryophyllene", "vanillin"],
    oils: "Eugenol · 70–85% of oil",
    note: "Sweet, medicinal and woody. Eugenol is the warm phenol that anchors garam masala.",
  },
];

export function BotanicalScene() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-3.5">
      {CARD_DATA.map((card, index) => {
        const entity = entities[card.key];
        return (
          <article
            key={card.key}
            data-reveal
            className="arch-card group relative overflow-hidden rounded-2xl border border-[rgba(232,181,106,.13)] bg-[linear-gradient(165deg,rgba(28,24,19,.7),rgba(10,9,8,.86))] p-5"
            style={{ ["--accent" as string]: card.accent }}
          >
            <div
              className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: card.glow, opacity: 0.7 }}
            />
            <div className="relative flex items-start justify-between">
              <div>
                <div className="text-[0.52rem] uppercase tracking-[0.24em] text-[#7F7466]">
                  Profile 0{index + 1}
                </div>
                <h3 className="mt-2 font-display text-[1.9rem] leading-none text-[#F6EFE4]">
                  {card.name}
                </h3>
              </div>
              <span
                className="grid h-8 w-8 place-items-center rounded-full border text-[0.62rem]"
                style={{
                  borderColor: `${card.accent}44`,
                  color: card.accent,
                  background: `${card.accent}0f`,
                }}
              >
                {index === 0 ? (
                  <Leaf size={13} />
                ) : index === 1 ? (
                  <Sparkles size={13} />
                ) : (
                  <Beaker size={13} />
                )}
              </span>
            </div>

            <div className="relative mt-5 space-y-1.5 border-y border-[rgba(232,181,106,.1)] py-3 text-[0.66rem]">
              <div className="flex justify-between gap-2">
                <span className="text-[#6F665B]">Botanical</span>
                <span className="text-right italic text-[#C9B79F]">
                  {getScientificName(card.key)}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-[#6F665B]">Family</span>
                <span className="text-[#C9B79F]">{card.family}</span>
              </div>
            </div>

            <div className="relative mt-4">
              <div className="mb-2 text-[0.52rem] uppercase tracking-[0.2em] text-[#756D62]">
                Essential-oil volatiles
              </div>
              <div className="flex flex-wrap gap-1.5">
                {card.compounds.map((compound) => (
                  <span
                    key={compound}
                    className="rounded-full border px-2 py-0.5 text-[0.56rem] tracking-[0.02em]"
                    style={{
                      borderColor: `${card.accent}2b`,
                      color: "#D9C7AE",
                      background: "rgba(255,255,255,.015)",
                    }}
                  >
                    {compound}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mt-4 text-[0.66rem] leading-5 text-[#8F8373]">
              {card.oils}
            </div>
            <p className="relative mt-3 text-[0.72rem] leading-5 text-[#A79C8D]">
              {card.note}
            </p>
            <div className="relative mt-4 flex flex-wrap gap-1">
              {(entity?.synergistic_pairs ?? []).slice(0, 4).map((pair) => (
                <span
                  key={pair}
                  className="text-[0.52rem] uppercase tracking-[0.1em] text-[#6E6458]"
                >
                  {pair}
                  <span className="ml-1.5 text-[#3E3831]">/</span>
                </span>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}
