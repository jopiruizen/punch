
async function __run() {
    var item = await collections.system_messages.findOne({ status_code: punch.models.system_message.status_code });
    if (item === null) {
        __insert();
    } else {
        punch.render({ message: {}, system_message: { status_code: "entry_exist", message: "Record already exist." } });
    }
}

async function __insert() {
    var data = await punch.insertOne(collections.system_messages, punch.models.system_message);
    if (data.result !== undefined) {
        punch.render({
            system_message: { status_code: "success", message: "System Messages created." },
            content: {
                system_message: punch.models.system_message,
                db_result: data.result,
            }
        });
    } else if (data.err) {
        punch.render({
            system_message: { status_code: "Technical Error", message: "Oops something bad happened" },
            request_content: punch.models.system_message
        });
    }
}
__run();