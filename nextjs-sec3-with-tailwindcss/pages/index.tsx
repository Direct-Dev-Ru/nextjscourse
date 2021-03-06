import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <Head>
        <title>Next.Js Course - Section 3</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
        <h1 className='text-6xl font-bold'>
          Introduction to{' '}
          <a className='text-blue-600' href='https://nextjs.org'>
            Next.js!
          </a>
        </h1>

        <p className='mt-3 text-2xl'>
          Click on some custom pages of this demo site{' '}
          <code className='p-3 font-mono text-lg bg-gray-100 rounded-md'>pages/index.tsx</code>
        </p>

        <div className='flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full'>
          <Link href='/portfolio'>
            <div className='p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600 cursor-pointer'>
              <h3 className='text-2xl font-bold'>Portfolio projects &rarr;</h3>
              <p className='mt-4 text-xl'>Find in-depth information about our completed projects.</p>
            </div>
          </Link>
          <Link href='/blogs'>
            <div className='p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600 cursor-pointer'>
              <h3 className='text-2xl font-bold'>Blog &rarr;</h3>
              <p className='mt-4 text-xl'>Read our amazing articles about web dev.</p>
            </div>
          </Link>
          <Link href='/clients'>
            <div className='p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600 cursor-pointer'>
              <h3 className='text-2xl font-bold'>Our Clients &rarr;</h3>
              <p className='mt-4 text-xl'>Read about our fully satisfied cliets and their projects we made.</p>
            </div>
          </Link>
          <Link href='/about'>
            <div className='p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600 cursor-pointer'>
              <h3 className='text-2xl font-bold'>About &rarr;</h3>
              <p className='mt-4 text-xl'>Read our amazing articles about web dev.</p>
            </div>
          </Link>{' '}
        </div>
      </main>

      <footer className='flex items-center justify-center w-full h-24 border-t'>
        <a
          className='flex items-center justify-center'
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by <img src='/vercel.svg' alt='Vercel Logo' className='h-4 ml-2' />
        </a>
      </footer>
    </div>
  );
}
