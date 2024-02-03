import insertMockUser from "../factories/User.factory";

export default async function seed() {
  await insertMockUser();
  console.log("Seeding complete");
}
