import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import { IsEmail, IsUUID } from 'class-validator'

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
}

@modelOptions({
  schemaOptions: {
    versionKey: false,
    timestamps: true,
  },
})
export class User {
  @prop({ required: true, trim: true, maxlength: 50 })
  name!: string

  @prop({ required: true })
  @IsEmail()
  email!: string

  @prop({ required: true })
  @IsUUID()
  sub!: string

  @prop({ required: true, enum: UserRole, default: UserRole.User })
  role!: UserRole
}

export default getModelForClass(User)
