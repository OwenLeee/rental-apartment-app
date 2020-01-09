import * as Knex from "knex";
import Table from '../table';
import { hashPassword } from "../auth/hash";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    await knex(Table.userFavour).del();
    await knex(Table.apartmentPhotos).del();
    await knex(Table.apartmentVideo).del();
    await knex(Table.apartmentFloorPlan).del();
    await knex(Table.rentalApartment).del();
    await knex(Table.verifyToken).del();
    await knex(Table.userInformation).del();
    await knex(Table.users).del();
    await knex(Table.bathrooms).del();
    await knex(Table.floorLevel).del();
    await knex(Table.bedrooms).del();
    await knex(Table.district).del();
    await knex(Table.apartmentType).del();
    await knex(Table.agent).del();

    await knex.raw(/* sql */ `ALTER SEQUENCE ${Table.agent}_id_seq RESTART`);
    const agent: { id: number }[] = (await knex.raw(/* sql */ `
        INSERT INTO ${Table.agent} (name, mobile_number, email)
        VALUES (?, ?, ?),(?, ?, ?),(?, ?, ?) RETURNING id`,
        [
            'Owen', '9123 1234', 'owen@owen.com',
            'Harry', '9123 1235', 'harry@harry.com',
            'Billy', '123456789', 'billy@billy.com'
        ]
    )).rows;

    await knex.raw(/* sql */ `ALTER SEQUENCE ${Table.apartmentType}_id_seq RESTART`);
    const apartmentType: { id: number }[] = (await knex.raw(/* sql */ `
        INSERT INTO ${Table.apartmentType} (house_type)
        VALUES (?),(?),(?),(?) RETURNING id`,
        [
            'Private Housing Estate', 
            'Village House', 
            'Serviced Apartment', 
            'Partitioned Flat'
        ]
    )).rows;

    await knex.raw(/* sql */ `ALTER SEQUENCE ${Table.district}_id_seq RESTART`);
    const areaDistrict: { id: number }[] = (await knex.raw(/* sql */ `
        INSERT INTO ${Table.district} (district, area)
        VALUES (?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),
        (?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),
        (?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),
        (?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),
        (?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),
        (?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),
        (?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),
        (?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?),(?, ?) RETURNING id`,
        [
            'Hong Kong Island', 'Island West', 
            'Hong Kong Island', 'Central', 
            'Hong Kong Island', 'Sheung Wan', 
            'Hong Kong Island', 'Mid-Level', 
            'Hong Kong Island', 'Wan Chai', 
            'Hong Kong Island', 'Causeway Bay', 
            'Hong Kong Island', 'Tin Hau', 
            'Hong Kong Island', 'Tai Hang', 
            'Hong Kong Island', 'North Point', 
            'Hong Kong Island', 'Fortress Hill', 
            'Hong Kong Island', 'Quarry Bay', 
            'Hong Kong Island', 'TaiKoo', 
            'Hong Kong Island', 'Sai Wan Ho', 
            'Hong Kong Island', 'Shau Kei Wan', 
            'Hong Kong Island', 'Heng Fa Chuen', 
            'Hong Kong Island', 'Chai Wan', 
            'Hong Kong Island', 'Shek O', 
            'Hong Kong Island', 'Aberdeen', 
            'Hong Kong Island', 'Island South',
            'Kowloon', 'Yau Tong', 
            'Kowloon', 'Lam Tin', 
            'Kowloon', 'Kwun Tong', 
            'Kowloon', 'Ngau Tau Kok', 
            'Kowloon', 'Kowloon Bay', 
            'Kowloon', 'Ngau Chi Wan', 
            'Kowloon', 'Diamond Hill', 
            'Kowloon', 'Lok Fu', 
            'Kowloon', 'To Kwa Wan', 
            'Kowloon', 'Kowloon City ', 
            'Kowloon', 'Kai Tak', 
            'Kowloon', 'San Po Kong ', 
            'Kowloon', 'Wong Tai Sin', 
            'Kowloon', 'Kowloon Tong', 
            'Kowloon', 'Ho Man Tin', 
            'Kowloon', 'Yau Yat Tsuen', 
            'Kowloon', 'Sham Shui Po ', 
            'Kowloon', 'Shek Kip Mei', 
            'Kowloon', 'Lai Chi Kok', 
            'Kowloon', 'Cheung Sha Wan', 
            'Kowloon', 'Mei Foo', 
            'Kowloon', 'Lai King', 
            'Kowloon', 'Tai Kok Tsui', 
            'Kowloon', 'Olympic', 
            'Kowloon', 'Kowlooon Station', 
            'Kowloon', 'Price Edward', 
            'Kowloon', 'Mong Kok', 
            'Kowloon', 'Yau Ma Tei', 
            'Kowloon', 'Tsim Sha Tsui', 
            'Kowloon', 'Jordan', 
            'Kowloon', 'Hung Hom', 
            'Kowloon', 'Whampoa', 
            'New Territories', 'Sai Kung', 
            'New Territories', 'Clear Water Bay', 
            'New Territories', 'Tseung Kwan O', 
            'New Territories', 'Ma On Shan', 
            'New Territories', 'Sha Tin', 
            'New Territories', 'Tai Wai', 
            'New Territories', 'Fo Tan', 
            'New Territories', 'Tai Po', 
            'New Territories', 'Tai Wo', 
            'New Territories', 'Fan Ling', 
            'New Territories', 'Sheung Shui', 
            'New Territories', 'Yuen Long', 
            'New Territories', 'Tin Shui Wai', 
            'New Territories', 'Tuen Mun', 
            'New Territories', 'Sham Tseng', 
            'New Territories', 'Tsuen Wan', 
            'New Territories', 'Tai Wo Hau', 
            'New Territories', 'Kwai Chung', 
            'New Territories', 'Kwai Fong', 
            'New Territories', 'Tsing Yi', 
            'Outlying Islands', 'Ma Wan', 
            'Outlying Islands', 'Discovery Bay', 
            'Outlying Islands', 'Tung Chung', 
            'Outlying Islands', 'South Lantau Island', 
            'Outlying Islands', 'Peng Chau', 
            'Outlying Islands', 'Tai O', 
            'Outlying Islands', 'Lamma Island', 
            'Outlying Islands', 'Cheung Chau', 
            'Outlying Islands', 'Other Islands'
        ]
    )).rows;

    await knex.raw(/* sql */ `ALTER SEQUENCE ${Table.bedrooms}_id_seq RESTART`);
    const bedrooms: { id: number }[] = (await knex.raw(/* sql */ `
        INSERT INTO ${Table.bedrooms} (bedrooms)
        VALUES (?),(?),(?),(?) RETURNING id`,
        [
            '1', 
            '2', 
            '3',
            '4 or above'
        ]
    )).rows;

    await knex.raw(/* sql */ `ALTER SEQUENCE ${Table.floorLevel}_id_seq RESTART`);
    const floorLevel: { id: number }[] = (await knex.raw(/* sql */ `
        INSERT INTO ${Table.floorLevel} (level)
        VALUES (?),(?),(?) RETURNING id`,
        [
            'Low',
            'Middle',
            'High'
        ]
    )).rows;

    await knex.raw(/* sql */ `ALTER SEQUENCE ${Table.bathrooms}_id_seq RESTART`);
    const bathrooms: { id: number }[] = (await knex.raw(/* sql */ `
        INSERT INTO ${Table.bathrooms} (bathrooms)
        VALUES (?),(?),(?) RETURNING id`,
        [
            '1', 
            '2',
            '3 or above'
        ]
    )).rows;

    await knex.raw(/* sql */ `ALTER SEQUENCE ${Table.users}_id_seq RESTART`);
    const users: { id: number }[] = (await knex.raw(/* sql */ `
        INSERT INTO ${Table.users} (email, password) 
        VALUES (?, ?), (?, ?), (?, ?) RETURNING id`,
        [
            'owen@owen.com', await hashPassword('123456'),
            'harry@harry.com', await hashPassword('123456'),
            'billy@billy.com', await hashPassword('123456')
        ]
    )).rows;

    //users_information table
    await knex.raw(/* sql */ `ALTER SEQUENCE ${Table.userInformation}_id_seq RESTART`);
    await knex.raw(/* sql */ `
    INSERT INTO ${Table.userInformation} (user_id, name, verified_email, gender, mobile, verified_mobile, icon)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
        users[0].id, 'Owen', false, 'Male', '6123 1234', false, 'owen.jpg', 
    ]
    );

    //verify_token table
    await knex.raw(/* sql */ `ALTER SEQUENCE ${Table.verifyToken}_id_seq RESTART`);
    await knex.raw(/* sql */ `
    INSERT INTO ${Table.verifyToken} (user_id, token)
    VALUES (?, ?)`,
    [
        users[0].id, 'iAmToken' 
    ]
    );

    //rental_apartment table 
    await knex.raw(/* sql */ `ALTER SEQUENCE ${Table.rentalApartment}_id_seq RESTART`);
    const rental_apartment: { id: number }[] = ( await knex.raw(/* sql */ `
    INSERT INTO ${Table.rentalApartment} 
    (user_id, apartment_type_id, area_district_id, bedrooms_id, floor_level_id, bathrooms_id, agent_id, 
    apartment_title, apartment_description, rental_price, deposit, period_years, address_building, address_block, 
    saleable_area, gross_floor_area, is_storeroom, is_carpark, is_furniture, lat, lng, post_date, end_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`, 
    [
        users[0].id, apartmentType[3].id, areaDistrict[2].id, bedrooms[1].id, floorLevel[1].id, bathrooms[0].id, agent[1].id, 
        'Comfortable and Big House', 'You can walk to Sheung Wan MTR within 5 minutes!', 28000, 3, 2, "Centre Place" , "1", 
        636, 870, true, false, true, 22.28552, 114.15769, '2020-01-01', '2020-12-01'
    ]
    )).rows; 

    //apartment_floor_plan
    await knex.raw(/* sql */ `ALTER SEQUENCE ${Table.apartmentFloorPlan}_id_seq RESTART`);
    await knex.raw(/* sql */ ` 
    INSERT INTO ${Table.apartmentFloorPlan} 
    (rental_apartment_id, floor_plan_json)
    VALUES (?, ?)`,
    [
        rental_apartment[0].id, '{"json": "json"}'
    ]
    ); 

    // apartment_video
    await knex.raw(/* sql */ `ALTER SEQUENCE ${Table.apartmentVideo}_id_seq RESTART`);
    await knex.raw(/* sql */ `
    INSERT INTO ${Table.apartmentVideo}
    (rental_apartment_id, video_path)
    VALUES (?, ?)`, 
    [
        rental_apartment[0].id, 'test_video.avi'
    ]
    ); 

      // apartment_photo
      await knex.raw(/* sql */ `ALTER SEQUENCE ${Table.apartmentPhotos}_id_seq RESTART`);
      await knex.raw(/* sql */ `
      INSERT INTO ${Table.apartmentPhotos}
      (rental_apartment_id, photo_path)
      VALUES (?, ?), (?, ?)`,
      [
          rental_apartment[0].id, 'test_photo1.jpg', 
          rental_apartment[0].id, 'test_photo2.jpg'
      ]
      ); 
  
      // user_favourite table 
      await knex.raw(/* sql */ `ALTER SEQUENCE ${Table.userFavour}_id_seq RESTART`);
      await knex.raw(/* sql */ ` 
      INSERT INTO ${Table.userFavour}
      (user_id, rental_apartment_id)
      VALUES (?, ?)`,
      [
          users[2].id, rental_apartment[0].id
      ]
      ); 
};
