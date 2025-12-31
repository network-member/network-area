import type { FC } from 'react'

import CRALogo from './CRA-logo.svg'
import * as styles from './styles.module.css'

export const CRAHomePage: FC = () => {
  return (
    <div className={styles.container}>
      <CRALogo className={styles.logo} />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
    </div>
  )
}
