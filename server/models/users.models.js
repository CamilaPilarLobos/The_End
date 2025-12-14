import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "The name of the user is mandatory"],
            minlength: [3, "The name should have at least 3 characters"],
        },
        lastName: {
            type: String,
            required: [true, "The last name of the user is mandatory"],
            minlength: [3, "The last name should have at least 3 characters"],
        },
        email: {
            type: String,
            required: [true, "The email has to be added"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "The password is a must"],
            minlength: [8, "The password has to have at least 8 characters"],
        },
    },
    { timestamps: true }
);

// Método virtual para confirmación de contraseña
userSchema.virtual("passwordConfirmation")
    .get(function () {
        return this._passwordConfirmation;
    })
    .set(function (value) {
        this._passwordConfirmation = value;
    });

// Validar que las contraseñas coincidan
userSchema.pre("validate", function () {
    if (this.password !== this.passwordConfirmation) {
        this.invalidate(
            "passwordConfirmation",
            "The password and the password confirmation do not match"
        );
    }
});

// Encriptar la contraseña antes de guardar
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10); // Generar la sal
    this.password = await bcrypt.hash(this.password, salt); // Hashear la contraseña
});

const User = mongoose.model("users", userSchema);

export { User, userSchema };