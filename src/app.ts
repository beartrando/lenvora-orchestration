import logger from '@shared/logger';
import MessageService from "./infrastructure/message/message.service";
import JobService from "./infrastructure/job/job.service";
import DbService from "./infrastructure/db/db.service";
import buildGrpcService from "./bootstrap/build-grpc-service";
import buildApplication from "./composition/build-application";


const application = buildApplication();

application.start();





