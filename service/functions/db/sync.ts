import db from '../../components/database'

export async function handler(): Promise<void> {
  const conn = await db.connect()

  for (const model of conn.modelNames()) await conn.model(model).syncIndexes()
}
