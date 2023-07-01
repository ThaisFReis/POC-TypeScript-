import Joi from "joi";
import { CreateUserParams, LoginParams, UpdateUserParams } from "@/services";

export const createUserSchema = Joi.object<CreateUserParams>({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const loginUserSchema = Joi.object<CreateUserParams>({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const updateUserSchema = Joi.object<UpdateUserParams>({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(6),
});