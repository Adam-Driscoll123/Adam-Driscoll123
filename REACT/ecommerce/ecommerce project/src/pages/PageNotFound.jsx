import { Header } from '../components/Header.jsx'


export function PageNotFound({cart}) {
  return (
    <>
      <Header cart={cart}/>

      <div className="home-page">
        404 Not Found
      </div>
    </>
  );
}