import React from 'react'

export const DivTable = ({children, col, off, classLoad, classTable}) => {
  return (
    <div className='row mt-3'>
        <div className={'col-md-'+col+' offset-md-'+off}>
            <div className={'card border-white text-center '+classLoad}>
                <div className='card-body'>
                    <img src="/stranger.gif" className='img-fluid'/>
                </div>
            </div>
            <div className={'table-responsive '+classTable}>
                {children}
            </div>
        </div>
    </div>
  )
}
