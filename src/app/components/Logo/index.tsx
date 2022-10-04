import styles from '@/app/components/Logo/styles.module.scss';

function Logo() {
  return (
    <div className={styles.logo_container}>
      <a href={'/'}>
        <svg
          className={styles.icon}
          width={'150'}
          height={'50'}
          viewBox={'0 0 287 108'}
          fill={'none'}
          xmlns={'http://www.w3.org/2000/svg'}>
          <path
            d={
              'M57.9622 44.1728C62.4808 45.653 66.0644 48.146 68.7132 51.6518C71.3621 55.0797 72.6865 59.3645 72.6865 64.5063C72.6865 71.5958 69.9597 77.0882 64.5063 80.9835C59.0529 84.8009 51.1065 86.7096 40.667 86.7096H0V4.90809H38.3298C47.9902 4.90809 55.4302 6.81679 60.65 10.6342C65.8697 14.3737 68.4795 19.5545 68.4795 26.1765C68.4795 30.2276 67.5447 33.8113 65.6749 36.9275C63.8052 40.0438 61.2343 42.4589 57.9622 44.1728ZM15.1917 16.8277V39.3816H36.6938C41.9914 39.3816 46.0425 38.4467 48.8472 36.577C51.7297 34.6293 53.171 31.8247 53.171 28.1631C53.171 24.4236 51.7297 21.619 48.8472 19.7492C46.0425 17.8016 41.9914 16.8277 36.6938 16.8277H15.1917ZM39.7322 74.7899C51.496 74.7899 57.3779 70.8557 57.3779 62.9871C57.3779 55.1186 51.496 51.1844 39.7322 51.1844H15.1917V74.7899H39.7322Z'
            }
            fill={'black'}
          />
          <path
            d={
              'M103.39 87.5276C96.9241 87.5276 91.8602 85.7747 88.1986 82.2689C84.6149 78.6852 82.8231 73.6603 82.8231 67.1941V0H97.4305V66.1423C97.4305 72.3748 100.352 75.4911 106.195 75.4911C108.143 75.4911 109.895 75.1016 111.454 74.3225L112.155 86.0084C109.428 87.0212 106.507 87.5276 103.39 87.5276Z'
            }
            fill={'black'}
          />

          <path
            d={
              'M201.355 31.6042C196.602 27.0077 190.292 24.7095 182.424 24.7095C180.696 24.7095 179.034 24.814 177.438 25.0232C171.391 25.685 166.405 27.9134 162.482 31.7082C157.73 36.3046 155.353 43.1214 155.353 52.1585V62.2095H169.961V54.0283C169.961 48.5749 171.246 44.4848 173.817 41.7581C175.916 39.469 178.515 37.7095 182.292 37.6933C186.015 37.7095 188.07 39.5279 190.019 41.6541C192.59 44.3808 193.876 48.4709 193.876 53.9243V86.8135H208.483V52.0545C208.483 43.0174 206.107 36.2006 201.355 31.6042Z'
            }
            fill={'black'}
          />
          <path
            d={
              'M191.268 103.442L191.28 103.455L191.293 103.468C193.761 105.698 196.921 107.012 200.243 107.189C203.565 107.366 206.847 106.395 209.538 104.44C212.23 102.484 214.167 99.6631 215.025 96.449C215.883 93.2349 215.609 89.8235 214.25 86.787C212.892 83.7505 210.53 81.2736 207.562 79.7716C204.594 78.2696 201.199 77.8339 197.948 78.5376C194.696 79.2413 191.786 81.0416 189.704 83.6366C187.623 86.2315 186.497 89.4633 186.515 92.7899L186.515 92.793C186.529 93.9884 186.697 95.177 187.015 96.3296L187.015 96.3296L187.016 96.3337C187.446 97.8436 187.909 99.0026 188.574 100.101C189.236 101.196 190.087 102.211 191.268 103.442ZM201.055 87.2699C202.147 87.2699 203.213 87.5935 204.121 88.1997C205.028 88.806 205.735 89.6676 206.153 90.6758C206.57 91.6839 206.68 92.7932 206.467 93.8635C206.254 94.9337 205.728 95.9168 204.957 96.6884C204.185 97.4599 203.202 97.9854 202.132 98.1983C201.062 98.4112 199.952 98.3019 198.944 97.8843C197.936 97.4667 197.074 96.7596 196.468 95.8523C195.862 94.945 195.538 93.8783 195.538 92.7871C195.538 91.3239 196.12 89.9205 197.154 88.8859C198.189 87.8512 199.592 87.2699 201.055 87.2699Z'
            }
            fill={'black'}
            stroke={'black'}
          />
          <path
            d={
              'M115.268 29.4425L115.28 29.4555L115.293 29.4675C117.761 31.6979 120.921 33.0119 124.243 33.1889C127.565 33.366 130.847 32.3954 133.538 30.4399C136.23 28.4845 138.167 25.6631 139.025 22.449C139.883 19.2349 139.609 15.8235 138.25 12.787C136.892 9.75054 134.53 7.27358 131.562 5.77159C128.594 4.26959 125.199 3.83392 121.948 4.53762C118.696 5.24133 115.786 7.04163 113.704 9.63657C111.623 12.2315 110.497 15.4633 110.515 18.7899L110.515 18.793C110.529 19.9884 110.697 21.177 111.015 22.3296L111.015 22.3296L111.016 22.3337C111.446 23.8436 111.909 25.0026 112.574 26.1012C113.236 27.1961 114.087 28.2107 115.268 29.4425ZM125.055 13.2699C126.147 13.2699 127.213 13.5935 128.121 14.1997C129.028 14.806 129.735 15.6676 130.153 16.6758C130.57 17.6839 130.68 18.7932 130.467 19.8635C130.254 20.9337 129.728 21.9168 128.957 22.6884C128.185 23.4599 127.202 23.9854 126.132 24.1983C125.062 24.4112 123.952 24.3019 122.944 23.8843C121.936 23.4667 121.074 22.7596 120.468 21.8523C119.862 20.945 119.538 19.8783 119.538 18.7871C119.538 17.3239 120.12 15.9205 121.154 14.8859C122.189 13.8512 123.592 13.2699 125.055 13.2699Z'
            }
            fill={'black'}
            stroke={'black'}
          />
          <path
            d={
              'M124.144 80.0228C128.896 84.6192 135.206 86.9175 143.075 86.9175C144.803 86.9175 146.464 86.8129 148.06 86.6038C154.107 85.9419 159.093 83.7136 163.016 79.9188C167.769 75.3223 170.145 68.5055 170.145 59.4684V49.3764H155.537V57.5987C155.537 63.0521 154.252 67.1422 151.681 69.8689C149.583 72.1579 146.983 73.9175 143.206 73.9337C139.483 73.9175 137.428 72.0991 135.479 69.9729C132.908 67.2462 131.623 63.1561 131.623 57.7027V24.8135H117.015V59.5724C117.015 68.6095 119.391 75.4263 124.144 80.0228Z'
            }
            fill={'black'}
          />
          <path
            d={
              'M170.145 50.6506V26.778C167.252 27.9218 164.698 29.5652 162.482 31.7082C158.493 35.5663 156.178 40.9889 155.537 47.9757V57.5987C155.537 58.7896 155.476 59.9156 155.353 60.9765V84.8491C158.246 83.7052 160.801 82.0618 163.016 79.9188C167.005 76.0606 169.32 70.6382 169.961 63.6514V54.0283C169.961 52.8374 170.022 51.7115 170.145 50.6506Z'
            }
            fill={'black'}
          />
          <path
            d={
              'M247.311 59.9488L236.443 70.2324V86.7096H221.835V0H236.443V52.353L266.709 24.3067H284.238L258.179 50.4832L286.692 86.7096H268.93L247.311 59.9488Z'
            }
            fill={'black'}
          />
        </svg>
      </a>
    </div>
  );
}

export default Logo;