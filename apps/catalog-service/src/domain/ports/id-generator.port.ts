

/**
 * 🛰️ The ID Generator Port
 * 
 * Why: Every Entity in our Domain requires a unique identifier to be "Born." 
 * We define this as a Port because generating a random string is a technical 
 * detail (Infrastructure), but having an identity is a business requirement (Domain).
 */
export interface IIdGeneratorInterface {
    generateId(): string;
}

export const I_ID_GENERATOR_INTERFACE = Symbol('I_ID_GENERATOR_INTERFACE')