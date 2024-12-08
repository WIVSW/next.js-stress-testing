import StatelessBig from '../common/stateless-big'

/** Force dynamic rendering */
export async function getServerSideProps() {
    return { props: { } }
}

export default function Home() {
  return <StatelessBig />;
}
