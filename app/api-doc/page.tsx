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

/*
import { getApiDocs } from '@/lib/swagger';

const ApiDocsPage: React.FC = () => {
    const apiDocs = getApiDocs();

    return (
        <div>
            <h1>API Documentation</h1>
            <pre>{JSON.stringify(apiDocs, null, 2)}</pre>
        </div>
    );
};

export default ApiDocsPage;
*/
