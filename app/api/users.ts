import { userModel } from "@/lib/mongoose";

await userModel.create({
    email: "test@example.com",
    password: "securepassword",
    firstName: "Test",
    lastName: "User",
})