import { TeamType } from "@/types/team";
import Image from "next/image";

const SingleTeam = ({ team }: { team: TeamType }) => {
  const { image, name, designation } = team;

  return (
    <div className="group mb-8 rounded-xl bg-white px-5 pb-10 pt-12 shadow-testimonial dark:bg-dark dark:shadow-none">
      <div className="relative z-10 mx-auto mb-5 h-[120px] w-[120px]">
        <Image
          src={image}
          alt={name}
          className="h-[120px] w-[120px] rounded-full"
          width={120}
          height={120}
        />
        <span className="absolute bottom-0 left-0 -z-10 h-10 w-10 rounded-full bg-primary opacity-0 group-hover:opacity-100"></span>
        <span className="absolute right-0 top-0 -z-10 opacity-0 group-hover:opacity-100">
          <svg
            width="55"
            height="53"
            viewBox="0 0 55 53"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M29.5326 0C29.5326 0 29.5326 8.46617 38.001 8.46617C46.4671 8.46617 46.4671 0 46.4671 0C46.4671 0 46.4671 8.46617 54.9332 8.46617V16.9323C54.9332 16.9323 46.4671 16.9323 46.4671 25.3985C46.4671 33.8647 54.9332 33.8647 54.9332 33.8647V42.3308C54.9332 42.3308 46.4671 42.3308 46.4671 50.797C46.4671 50.797 46.4671 42.3308 38.001 42.3308C29.5326 42.3308 29.5326 50.797 29.5326 50.797C29.5326 50.797 29.5326 42.3308 21.0665 42.3308C12.6003 42.3308 12.6003 50.797 12.6003 50.797C12.6003 50.797 12.6003 42.3308 4.13638 42.3308V33.8647C4.13638 33.8647 12.6003 33.8647 12.6003 25.3985C12.6003 16.9323 4.13638 16.9323 4.13638 16.9323V8.46617C4.13638 8.46617 12.6003 8.46617 12.6003 0C12.6003 0 12.6003 8.46617 21.0665 8.46617C29.5326 8.46617 29.5326 0 29.5326 0Z"
              className="fill-primary"
            />
          </svg>
        </span>
      </div>

      <div className="text-center">
        <h4 className="mb-1.5 text-lg font-semibold text-dark dark:text-white">
          {name}
        </h4>
        <p className="text-sm text-body-color">{designation}</p>
      </div>
    </div>
  );
};

export default SingleTeam;
