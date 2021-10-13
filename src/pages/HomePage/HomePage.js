import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import api from '../../api/api';

const HomePage = () => {
  api
    .getData({ s: 'game' })
    .then(data => console.log(data))
    .catch(err => console.log(err));
  return (
    <Card>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
        voluptas adipisci harum beatae, fuga vel repudiandae rem cumque
        similique magni praesentium nemo! Ducimus accusamus accusantium
        obcaecati laboriosam dolorum soluta molestiae. Officia provident
        suscipit dolore fugit vel quo a laudantium eius ea, quae minus
        consectetur. Explicabo, ipsa. Reprehenderit accusamus, explicabo dolores
        quo quasi consectetur quaerat laborum inventore provident velit, libero
        enim. Por voluptas? Accusantium, nihil quo.
      </p>
      <Button type="submit">click here</Button>
    </Card>
  );
};

export default HomePage;
