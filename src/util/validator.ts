import { ObjectSchema, object, string } from "yup";

type userLogin = {
  email: string;
  password: string;
};

export const userLoginShema: ObjectSchema<userLogin> = object({
  email: string().email().required(),
  password: string().min(4, "must be at least 3 characters long").required(),
});
