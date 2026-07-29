import * as healthProto from "../../contracts/proto/common/health";

export class LivezUseCase {
    async execute(): Promise<healthProto.LiveStatus> {
        return {
            live: true,
        };
    }
}


const livezUseCase = new LivezUseCase();

export default livezUseCase;

