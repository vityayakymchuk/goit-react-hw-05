import css from './SearchMovie.module.css'


export default function SearchMovie({handleSubmit}) {
  return (
    <form className={css.form} onSubmit={handleSubmit}>
        <input className={css.input} type="text" name='movieName' placeholder='Enter the title to search' autoComplete="off" autoFocus pattern="^[a-zA-Zа-яА-Я]+((['\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$" required/>
              <button className={css.btn} type='submit'>Search</button>
          </form>
  )
}
