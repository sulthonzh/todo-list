export declare class TaskPublisher {
    private client;
    constructor();
    publishTaskCreatedEvent(task: any): import("rxjs").Observable<any>;
}
