let jurusanColumnEnsured = false;

export async function ensureJurusanColumn(db) {
  if (jurusanColumnEnsured) return;

  const [columns] = await db.execute(
    "SHOW COLUMNS FROM siswa LIKE 'jurusan_pilihan'"
  );

  if (!columns || columns.length === 0) {
    await db.execute(
      "ALTER TABLE siswa ADD COLUMN jurusan_pilihan VARCHAR(255) DEFAULT NULL"
    );
  }

  jurusanColumnEnsured = true;
}

