import * as healthGrpc from "../../contracts/proto/generated/common/health";

export class ReadyzUseCase {
    async execute(): Promise<healthGrpc.ReadyStatus> {
        return {ready: true};
    }
}

const readyzUseCase = new ReadyzUseCase();

export default readyzUseCase;
