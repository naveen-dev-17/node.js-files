function get_records(db_connection)
{
    return function(request, response)
    {
        const table = request.params.table;

        db_connection.query(`SELECT * FROM \`${table}\``, (err, rows, fields) =>
        {
            if (err) return response.json({ error: err.message });

            const columns = fields.map(field => field.name);
            response.json({ columns, data: rows });
        });
    };
}

module.exports = get_records;
