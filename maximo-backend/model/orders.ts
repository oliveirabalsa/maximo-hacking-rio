export default interface Orders {
  _id: {
    $oid: string;
  };
  title: string;
  user_id: string;
  user_name: string;
  status: string;
  location: {
    latitude: string;
    longitude: string;
    street: string;
    number: number;
    neighborhood: string;
    postalCode: string;
    city: string;
    state: string;
    complement: string;
  }
  description: string;
  
}
