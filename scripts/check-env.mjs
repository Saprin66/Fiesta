// Сборка без базы данных дала бы сайт, который падает на каждой странице.
// Поэтому без обязательных переменных сборка останавливается, а предыдущая версия продолжает работать.
const required = ['DATABASE_URL', 'AUTH_SECRET'];
const missing = required.filter((name) => !process.env[name]);
if (missing.length > 0) {
  console.error(`\nНе заданы переменные окружения: ${missing.join(', ')}. См. .env.example и README.\n`);
  process.exit(1);
}
