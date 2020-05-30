export default interface IMenu {
  _id: {
    $oid: string;
  };
  image: any;
  name: string;
  description: string;
  variable: Array<IMenu>;
  price: string;
  timestamps: true;
}
