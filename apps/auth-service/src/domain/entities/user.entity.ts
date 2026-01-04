export type UserRole = 'ADMIN' | 'USER';

export class User {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly password: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly role: UserRole,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) { }

    static create(data: Omit<User, 'createdAt' | 'updatedAt'>) {
        return new User(
            data.id,
            data.email,
            data.password,
            data.firstName,
            data.lastName,
            data.role,
            new Date(),
            new Date(),
        )
    }
}