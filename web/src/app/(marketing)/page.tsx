import { auth } from '@clerk/nextjs';
import Card from '@/app/components/Card';
import MySignInButton from '@/app/components/MySignInButton';
import Bokeh from '@/app/components/design/Bokeh';
import Bokeh2 from '@/app/components/design/Bokeh2';

export default function Landing() {
  const { userId } = auth();

  if (!userId) {
    return (
      <section className='relative isolate px-6 pt-14 lg:px-8'>
        <Bokeh />
        <div className='mx-auto min-h-screen max-w-2xl py-32 sm:py-48 lg:py-56'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
              Supercharge your social media marketing
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Spend less time tracking and more time engaging.
            </p>

            <Card />

            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <MySignInButton>
                <button className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                  Get started
                </button>
              </MySignInButton>
              <a
                href='/about'
                className='text-sm font-semibold leading-6 text-gray-900'
              >
                Learn more <span aria-hidden='true'>→</span>
              </a>
            </div>
          </div>
        </div>
        <Bokeh2 />
      </section>
    );
  }

  return (
    <section className='mx-auto min-h-screen max-w-2xl py-32 sm:py-48 lg:py-56'>
      <Bokeh />
      <Bokeh2 />
      <h3>signed in</h3>
    </section>
  );
}
