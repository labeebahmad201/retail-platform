import { Injectable } from "@nestjs/common";
import { createId } from "@paralleldrive/cuid2";
import { IIdGeneratorInterface } from "src/domain/ports/id-generator.port";

/**
 * 🛠️ The ID Generator Adapter
 * 
 * Why: This is the concrete implementation (Infrastructure) of the IIdGenerator port. 
 * It lives in the Infrastructure layer because it depends on a specific library 
 * (@paralleldrive/cuid2).
 * 
 * Trade-off: While the Domain defines the NEED (Port), Infrastructure provides the 
 * CAPABILITY (Adapter). This allows us to swap CUID for any other ID strategy 
 * without touching the Business Logic.
 */
@Injectable()
export class CuidGenerator implements IIdGeneratorInterface {
    generateId(): string {
        return createId()
    }
}