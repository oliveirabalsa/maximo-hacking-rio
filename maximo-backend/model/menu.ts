export default interface IMenu {
  _id: {
    $oid: string;
  };
  image: any;
  name: string;
  description: string;
  variable: Array<IMenu>;
  price: number;
  timestamps: true;
}
