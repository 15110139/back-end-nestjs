import { createParamDecorator } from "@nestjs/common";

export const ArgsObj = createParamDecorator(
    (data, [root, args, ctx, info]) => {
        const newVal = Object['values'](args)[0]
        return newVal
    })