function delete_record(db_connection)
{
    return function(request, response)
    {
        const { table, id, pk } = request.params;

        db_connection.query(
            `DELETE FROM \`${table}\` WHERE \`${pk}\`=?`,
            [id],
            (err, result) =>
            {
                if (err) return response.send("0");
                response.send(result.affectedRows > 0 ? "1" : "0");
            }
        );
    };
}

module.exports = delete_record;