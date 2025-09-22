import {z} from 'zod';


export const userSchema = z.object({
    name: z
        .string()
        .min(3,{
            message: "El nombre debe tener al menos 3 caracteres"
        }).max(200,{
            message: "El nombre debe tener como máximo 200 caracteres"
        }),
    birthDate: z.string().refine((date: string) => {
        return !isNaN(Date.parse(date));
    }, {
        message: "El formato de la fecha es inválido"
    }),
    description: z
        .string()
        .min(10,{
            message: "La descripción debe tener al menos 10 caracteres"
        }).max(500,{
            message: "La descripción debe tener como máximo 500 caracteres"
        }),
    image: z.string().url("La imagen debe ser una URL válida"),

});