package com.niantic.repositories;

import com.niantic.models.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Component
public class MySqlProfileDao implements ProfileDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MySqlProfileDao(DataSource dataSource)
    {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public List<Profile> getAllProfiles() {
        return List.of();
    }

    @Override
    public Profile getProfile(int profileId) {

        String sql = """
                    SELECT
                        p.profile_id
                        , p.user_id
                        , u.username
                        , p.profile_img
                        , p.bio
                    FROM
                        profiles p
                    JOIN
                        users u ON p.user_id = u.user_id
                    WHERE
                        profile_id = ?
                    """;

        var result = jdbcTemplate.query(
                sql,
                new Object[]{profileId},
                new ProfileRowMapper()
        );
        return result.getFirst();
    }

    @Override
    public List<Profile> searchProfiles(String query) {
        return List.of();
    }

    @Override
    public Profile addProfile(Profile profile) {
        return null;
    }

    @Override
    public boolean updateProfile(int profileId, Profile profile) {
        return false;
    }

    @Override
    public boolean deleteProfile(int profileId) {
        return false;
    }

    public class ProfileRowMapper implements RowMapper<Profile>
    {

        @Override
        public Profile mapRow(ResultSet rs, int rowNum) throws SQLException {
            Profile profile = new Profile();
            profile.setProfileId(rs.getInt("profile_id"));
            profile.setUserId(rs.getInt("user_id"));
            profile.setUserName(rs.getString("username"));
            profile.setProfileImg(rs.getString("profile_img"));
            profile.setBio(rs.getString("bio"));

            return profile;
        }
    }
}
