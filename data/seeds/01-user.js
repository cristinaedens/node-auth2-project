exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').truncate()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([
                { id: 1, username: 'devilspike', password: 'ilikepie2' },
                { id: 2, username: 'RockinRyan', password: 'rockin123' },
                { id: 3, username: 'SimpliDrew', password: 'mylo321' }
            ]);
        });
};