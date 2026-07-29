import * as healthProto from "../../contracts/proto/common/health";

export class ReadyzUseCase {
    async execute(): Promise<healthProto.ReadyStatus> {
        return {ready: true};
    }
}

const readyzUseCase = new ReadyzUseCase();

export default readyzUseCase;
