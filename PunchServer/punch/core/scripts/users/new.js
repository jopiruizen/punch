async function __run() {
    var username = await collections.users.findOne({ email: punch.models.user.username });
    var email = await collections.users.findOne({ email: punch.models.user.email });
    if (username === null && email === null) {
        __insert();
    } else {
        punch.render({
            system_message: { status_code: "entry_exist", message: "Record already exist." },
            user: punch.models.user
        });
    }
}

async function __insert() {
    var data = await punch.insertOne(collections.users, punch.models.user);
    if (data.result !== undefined) {
        punch.render({
            system_message: { status_code: "success", message: "User created." },
            content: {
                user: punch.models.user,
                db_result: data.result,
            }
        });
    } else if (data.err) {
        punch.render({
            system_message: { status_code: "Technical Error", message: "Oops something bad happened" },
            user: punch.models.user
        });
    }
}

__run();