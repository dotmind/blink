import { useUpload } from '@/modules/upload/providers/UploadProvider';

const BASE_WEIGHT = 2.4; // gCO2e for 1Mo mail attachment
const RATIO = 48;

function EcoImpactCalculator() {
  const { fileWeight } = useUpload();
  const weightInMb = Math.round((fileWeight / 1000000) * 100) / 100;
  const baseEcoImpact = weightInMb * BASE_WEIGHT;
  const newEcoImpact = weightInMb * (BASE_WEIGHT / RATIO);

  return (
    <p className={'text-center'}>
      Votre fichier représente environs <span className={'text-blue'}>{newEcoImpact} gCO2e</span> contre{' '}
      <span className={'text-green'}>{baseEcoImpact} gCO2e</span> pour un fichier de même taille envoyé par mail 🌿.
    </p>
  );
}

export default EcoImpactCalculator;
