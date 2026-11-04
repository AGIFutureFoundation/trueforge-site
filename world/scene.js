// AGIF WORLD scene — trueforge.agifuturefoundation.org
// trueforge — the open-source forge: anvil, hearth, tool racks, and the great gear.
window.AGIF_SCENE = {
  id: "trueforge",
  name: "The trueforge Smithy",
  accent: "#f472b6",
  sky: 0x120a10, fog: [0x120a10, 16, 80],
  ground: { color: 0x1d0f16, grid: true },
  sun: { pos: [-25, 50, 30], color: 0xffd3e6 },

  spawn: [0, 17],

  props: [
    { type: "box", pos: [0, 0.75, -4], size: [2.6, 1.5, 1.3], color: 0x2d2d35, flat: true,
      label: "THE ANVIL", onClick: { action: "toast", text: "🔨 THE ANVIL — where an LLM is hammered into a working agent. Runtime layer, load-bearing." } },
    { type: "cyl", pos: [-4.5, 0.9, -4], size: [1.3, 1.8], color: 0x9d174d, flat: true,
      label: "THE HEARTH", onClick: { action: "pulse" } },
    { type: "box", pos: [5, 1.3, -4], size: [0.3, 2.6, 3.2], color: 0x3b3040, flat: true,
      label: "TOOL RACK", onClick: { action: "toast", text: "TOOL RACK — the harness, laid out in order. The order is the harness." } },
    { type: "cyl", pos: [3.5, 0.9, 1.5], size: [0.9, 1.8], color: 0x2a3a4a, flat: true,
      label: "QUENCH BARREL", onClick: { action: "toast", text: "QUENCH BARREL — for overheated loops. It sees daily use." } },
    { type: "sphere", pos: [-1.5, 2.6, -5], size: [0.35], color: 0xf472b6,
      label: "STRAY SPARK", onClick: { action: "bounce" } },
    { type: "box", pos: [-4, 0.5, 4], size: [1.8, 1, 1.8], color: 0xf472b6, flat: true,
      label: "OPEN SOURCE", onClick: { action: "link", url: "https://github.com/AGIFutureFoundation/trueforge" } },
    { type: "box", pos: [7.5, 0.7, 3], size: [2, 1.4, 1], color: 0x40324a, flat: true,
      label: "INGOT RACK", onClick: { action: "toast", text: "INGOT RACK — raw models, pre-harness. Do not deploy un-forged." } },
  ],

  agents: [
    { name: "THE SMITH", role: "harness keeper", pos: [2.5, -1], color: 0xf472b6, accentColor: "#f472b6", lines: [
      "trueforge — the open-source agent harness. The runtime layer that turns an LLM into a working agent.",
      "Raw model on the rack, working agent off the anvil. Same metal, better shape.",
      "Open source: the forge plans are public. Bring your own hammer.",
    ] },
    { name: "APPRENTICE", role: "tooling", pos: [-3.5, 1.5], color: 0xf9a8d4, accentColor: "#f472b6", lines: [
      "I mind the tool racks. A harness is just tools in a row — the row matters more than the tools.",
      "The quench barrel is for overheated loops. In daily use. Hourly, on release days.",
    ] },
    { name: "THE STOKER", role: "hearth", pos: [6, 4], color: 0x94a3b8, accentColor: "#f472b6", lines: [
      "The hearth burns steady. It has never once asked for credentials — the harness handles that part.",
      "The spark over the anvil bounces, but never ships. There's a lesson in that.",
    ] },
  ],

  decor: [
    { type: "pillars", count: 18, radius: 26, color: 0x241b26, h: 5 },
    { type: "crystals", count: 9, radius: 14, color: 0x831843, h: 1.5 },
  ],

  eggs: {
    duck: true, duckPos: [14, 0, -12],
    konami: "🎮 WHITE HOT — the forge burns through the whole harness. Ship it? No. Tests first. Always tests first. (easter egg 2/2)",
  },

  // bespoke hero: the great gear — torus, spokes, teeth, pink hub
  build: (THREE, world, api) => {
    const gear = new THREE.Group();
    const rim = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.45, 8, 16), api.mat(0x6b7280, true));
    gear.add(rim);
    for (let i = 0; i < 4; i++) {
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.22, 0.22), api.mat(0x6b7280, true));
      spoke.rotation.z = i * Math.PI / 4;
      gear.add(spoke);
    }
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.5, 0.4), api.mat(0x4b5563, true));
      tooth.position.set(Math.cos(a) * 1.95, Math.sin(a) * 1.95, 0);
      tooth.rotation.z = a - Math.PI / 2;
      gear.add(tooth);
    }
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.5, 8), api.mat(0xf472b6, true));
    hub.rotation.x = Math.PI / 2;
    gear.add(hub);
    gear.position.set(0, 3.6, -9);
    gear.userData.label = "THE GEAR";
    gear.userData.onClick = { action: "spin" };
    api.clickables.push(gear);
    world.add(gear);
    for (const sx of [-1.3, 1.3]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 3.6, 6), api.mat(0x3b3040, true));
      post.position.set(sx, 1.8, -9.35);
      world.add(post);
    }
    const sh = api.blobShadow(2.4); sh.position.set(0, 0.02, -9);
    world.add(sh);
  },
};
