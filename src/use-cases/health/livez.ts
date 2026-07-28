import * as healthGrpc from "../../contracts/proto/generated/common/health";

export class LivezUseCase {
    async execute(): Promise<healthGrpc.LiveStatus> {
        return {
            live: true,
        };
    }
}


const livezUseCase = new LivezUseCase();

export default livezUseCase;

