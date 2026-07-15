/**
 * Rozet efekt kayıt defteri.
 * Her backend `animation` enum değeri bir efekt yapılandırmasına eşlenir.
 * Efekt katmanı nadirlik gövdesinin ÜSTÜNE biner — ikisi bağımsızdır.
 *
 * fx    : CSS sınıf soneki (.bm-fx-<fx>)
 * dots  : kaç adet parçacık <i> üretileceği
 * rings : kaç adet yörünge halkası üretileceği
 * svg   : gövde üstü amblem (JSX BadgeMedal içinde çizilir)
 * clip  : efekt katmanı nadirlik şekline kırpılsın mı (yüzey efektleri için)
 */

export type BadgeEmblem =
  | "bolt"
  | "bolt2"
  | "wings"
  | "crystal"
  | "crown"
  | "skull"
  | "sword"
  | "clover";

export interface BadgeEffectConfig {
  fx: string;
  dots?: number;
  rings?: number;
  svg?: BadgeEmblem;
  clip?: boolean;
}

export const BADGE_EFFECTS: Record<string, BadgeEffectConfig> = {
  NONE: { fx: "" },

  /* --- mevcut 30 enum (geriye uyumlu) --- */
  ELECTRIC_BORDER: { fx: "lightning", svg: "bolt" },
  SHADOW_PULSE: { fx: "smoke" },
  HOVER_GLOW: { fx: "halo" },
  RAINBOW_BORDER: { fx: "holo", clip: true },
  FIRE_BORDER: { fx: "ember", dots: 3 },
  NEON_FLICKER: { fx: "neon" },
  CYBER_GLITCH: { fx: "glitch", clip: true },
  BREATHING: { fx: "halo" },
  HEARTBEAT: { fx: "heart" },
  ORBIT: { fx: "orbit", rings: 2 },
  BORDER_BEAM: { fx: "beam" },
  SHIMMER: { fx: "linear", clip: true },
  RIPPLE: { fx: "halo" },
  PLASMA: { fx: "plasma" },
  FROST: { fx: "frost" },
  GOLD_SHINE: { fx: "gold" },
  VORTEX: { fx: "galaxy", clip: true },
  AURORA: { fx: "cosmos", clip: true },
  LIGHTNING: { fx: "lightning", svg: "bolt" },
  SNAKE: { fx: "beam" },
  SCANLINE: { fx: "scan", clip: true },
  DOUBLE_GLOW: { fx: "double" },
  SPOTLIGHT: { fx: "glare", clip: true },
  METEOR: { fx: "meteor", dots: 2 },
  TOXIC: { fx: "toxic", dots: 2 },
  DIAMOND_SPARKLE: { fx: "sparkle", dots: 3 },
  STAR_BORDER: { fx: "sparkle", dots: 3 },
  SHINE_BORDER: { fx: "linear", clip: true },
  NEON_PULSE: { fx: "neon" },

  /* --- yeni: kenarlar & aura --- */
  AURORA_BORDER: { fx: "aurora" },
  DASH_ORBIT: { fx: "dash" },
  RADIANT_RAYS: { fx: "rays" },

  /* --- yeni: parçacıklar --- */
  FIREFLY: { fx: "firefly", dots: 4 },
  CONFETTI: { fx: "confetti", dots: 4 },
  STARDUST: { fx: "stardust", dots: 4 },
  BUBBLE: { fx: "bubble", dots: 3 },

  /* --- yeni: holografik / foil --- */
  PRISM: { fx: "prism", clip: true },

  /* --- yeni: kozmik --- */
  GALAXY_RING: { fx: "galaxy", clip: true },
  NEBULA: { fx: "nebula", clip: true },
  VOID_RING: { fx: "blackhole", clip: true },
  SUPERNOVA: { fx: "supernova", clip: true },
  STARFIELD_RING: { fx: "starfield", clip: true },
  COMET: { fx: "comet", rings: 1 },

  /* --- yeni: enerji / sci-fi --- */
  PLASMA_CORE: { fx: "core" },
  FORCE_FIELD: { fx: "field" },
  HOLOGRAM: { fx: "hologram", clip: true },
  POWER_SURGE: { fx: "surge" },
  ARC_REACTOR: { fx: "arc" },

  /* --- yeni: glitch / cyber --- */
  MATRIX: { fx: "matrix", clip: true },
  DATA_STREAM: { fx: "data", dots: 4, clip: true },
  SCANLINE_TV: { fx: "static", clip: true },

  /* --- yeni: sıvı / metal --- */
  LIQUID_METAL: { fx: "chrome" },
  GOLD_SHIMMER: { fx: "goldshine" },

  /* --- yeni: element --- */
  LAVA_RING: { fx: "lava", clip: true },
  VENOM_RING: { fx: "venom", dots: 2 },
  SAKURA_RING: { fx: "sakura", dots: 3 },
  OCEAN_WAVE: { fx: "aqua", clip: true },

  /* --- yeni: efsanevi / aşırı --- */
  RAINBOW_PRISM: { fx: "rainbow" },
  PHOENIX: { fx: "phoenix", dots: 3 },
  DIVINE: { fx: "divine" },
  VOID_CORE: { fx: "void" },
  DRAGON: { fx: "dragon" },
  BLACK_FLAME: { fx: "blackflame" },
  BLOOD_MOON: { fx: "bloodmoon" },
  SOLAR_FLARE: { fx: "solar" },
  THUNDER_GOD: { fx: "thunder", svg: "bolt2" },
  CELESTIAL_RUNES: { fx: "runes" },
  PRISM_SHATTER: { fx: "shatter", clip: true },
  ANGEL_HALO: { fx: "wings", svg: "wings" },
  DEMON_AURA: { fx: "demon" },
  KITSUNE_FIRE: { fx: "kitsune", dots: 3 },
  VAPORWAVE: { fx: "vapor", clip: true },

  /* --- yeni: semboller & temalar --- */
  CROWN: { fx: "crown", svg: "crown" },
  SKULL: { fx: "skull", svg: "skull" },
  CRYSTAL_3D: { fx: "crystal", svg: "crystal" },
  SWORD_CROSS: { fx: "sword", svg: "sword" },
  CLOVER_LUCK: { fx: "clover", svg: "clover" },
};

export function getBadgeEffect(animation?: string | null): BadgeEffectConfig {
  if (!animation) return BADGE_EFFECTS.NONE;
  return BADGE_EFFECTS[animation] ?? BADGE_EFFECTS.NONE;
}

/**
 * Arka katman efektleri: kenar/aura/glow ağırlıklı olanlar gövdenin ARKASINA
 * render edilir; böylece nadirlik şekli görünür kalır, glow çevreden taşar.
 * Geri kalanı (parçacık, yüzey kaplaması, amblem) gövdenin ÖNÜNDE, ikonun altında.
 */
const BACK_FX = new Set<string>([
  "aurora", "beam", "dash", "plasma", "gold", "neon", "halo", "double", "rays",
  "smoke", "inferno", "demon", "runes", "solar", "bloodmoon", "blackflame",
  "void", "dragon", "divine", "field", "surge", "arc", "rainbow", "thunder",
  "lightning", "toxic", "venom",
]);

export function isBackEffect(fx: string): boolean {
  return BACK_FX.has(fx);
}
