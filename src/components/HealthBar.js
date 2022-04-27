import FavoriteIcon from '@mui/icons-material/Favorite';

export const HealthBar = ({ lives=3, totalLives=3 }) => {
  const fullHeartStyle = {
    fill:"#f54242"
  };

  const emptyHeartStyle = {
    fill:"#828282"
  };

  return (
    <div className='health-bar flex flex-row-reverse'>
      {
        [...Array(totalLives).keys()].map((n,k)=>
          <FavoriteIcon key={k} sx={n<lives?fullHeartStyle:emptyHeartStyle}/>
        )
      }
    </div>
  )
}