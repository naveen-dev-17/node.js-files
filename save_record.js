function execute_query(db_connection, response, sql, values, success_message)
{
    db_connection.query(sql, values, (err, result) =>
    {
        if (err) return response.status(500).send(err.message);
        if (!result.affectedRows) return response.status(404).send(`${success_message.split(" ")[0]} Failed`);
        response.send(success_message);
    });
}

function build_update_query(table, data, id, primaryKey)
{
    const keys = Object.keys(data).filter(key => key !== primaryKey);
    const set_clause = keys.map(key => `\`${key}\`=?`).join(", ");
    const values = [...keys.map(key => data[key]), id];
    const sql = `UPDATE \`${table}\` SET ${set_clause} WHERE \`${primaryKey}\`=?`;

    return { sql, values };
}

function build_insert_query(table, data)
{
    const keys = Object.keys(data);
    const columns = keys.map(key => `\`${key}\``).join(", ");
    const placeholders = keys.map(() => "?").join(", ");
    const values = keys.map(key => data[key]);
    const sql = `INSERT INTO \`${table}\` (${columns}) VALUES (${placeholders})`;

    return { sql, values };
}

function save_record(db_connection)
{
    return function(request, response)
    {
        const { table, data, id, primaryKey } = request.body;

        const is_update = id && id !== "null";
        const { sql, values } = is_update
            ? build_update_query(table, data, id, primaryKey)
            : build_insert_query(table, data);
        const success_message = is_update ? "Updated" : "Inserted";

        execute_query(db_connection, response, sql, values, success_message);
    };
}

module.exports = save_record;