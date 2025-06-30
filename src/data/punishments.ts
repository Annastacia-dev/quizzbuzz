export const punishments = [
  "Do 10 jumping jacks! 🏃‍♂️",
  "Sing 'Happy Birthday' in an opera voice! 🎭",
  "Tell everyone your most embarrassing moment! 😅",
  "Do your best robot dance for 15 seconds! 🤖",
  "Speak in a British accent for the next 2 minutes! 🇬🇧",
  "Do 5 push-ups right now! 💪",
  "Sing the chorus of 'Baby Shark'! 🦈",
  "Do your best impression of a chicken! 🐔",
  "Tell a dad joke and make everyone groan! 👨‍💼",
  "Do the floss dance! 💃",
  "Pretend to be a news anchor and report on what you had for breakfast! 📺",
  "Do your best cat impression for 10 seconds! 🐱",
  "Sing 'Twinkle Twinkle Little Star' like a rock star! 🎸",
  "Do 10 air punches while making sound effects! 👊",
  "Pretend to be a runway model and strike 3 poses! 💅",
  "Do your best zombie walk around the room! 🧟‍♂️",
  "Sing 'Old MacDonald' but replace all animals with dinosaurs! 🦕",
  "Do the worm dance move! 🐛",
  "Pretend to be a weather person and give tomorrow's forecast! ☀️",
  "Do 15 seconds of silent disco dancing! 🕺"
];

export const getRandomPunishment = (): string => {
  return punishments[Math.floor(Math.random() * punishments.length)];
};