import Button from '../Button/Button';
import classes from './SearchForm.module.css';

const SearchForm = ({ onSubmit, value, onChange, datalist }) => {
  return (
    <form onSubmit={onSubmit} className={classes['form-control']}>
      <div>
        <label className={classes['form-control__label']}>
          Enter a keyword
        </label>
        <input
          className={classes['form-control__input']}
          type="text"
          id="keyword"
          name="keyword"
          value={value}
          onChange={onChange}
          placeholder="Movie or series name..."
        />
        {datalist.length > 0 && (
          <section className={classes['form-control__list']}>
            {datalist.map(item => {
              return (
                <div
                  className={classes['form-control__list__item']}
                  key={item.Title}
                  value={item.Title}
                  onClick={() => {
                    console.log(item.Title);
                  }}
                >
                  {item.Title}
                </div>
              );
            })}
          </section>
        )}
      </div>
    </form>
  );
};
export default SearchForm;
