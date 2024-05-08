import { getApiDocs } from '@/lib/swagger';
import ReactSwagger from './react-swagger';

export default async function ApiDocsPage() {
  const spec = await getApiDocs();
  return (
    <div className='pt-6'>
      <section className='container'>
        <ReactSwagger spec={spec} url='/swagger.json' />
      </section>
    </div>
  )
}
