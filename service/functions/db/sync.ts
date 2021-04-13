import db from '../../components/database'

export async function handler(): Promise<void> {
  const client = await db.connect()
  const schemas = await loadSchemas()

  await db.disconnect()
}
