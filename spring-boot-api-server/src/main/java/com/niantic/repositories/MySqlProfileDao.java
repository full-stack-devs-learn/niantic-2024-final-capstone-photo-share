package com.niantic.repositories;

import com.niantic.models.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
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
    public List<Profile> getAllProfiles(int page, int size) {

        int offset = (page-1) * size;

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
                LIMIT
                    ?
                OFFSET
                    ?;
                """;

        var results = jdbcTemplate.query(
                sql,
                new Object[]{size, offset},
                new ProfileRowMapper()
        );

        return results;
    }

    @Override
    public int getTotalProfileCount()
    {
        String sql = """
                SELECT
                    COUNT(*)
                FROM
                    profiles
                """;

        Integer count = jdbcTemplate.query(sql, rs -> {
            if (rs.next()) {
                return rs.getInt(1);
            }
            return 0;
        });

        return count != null ? count : 0;
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
    public Profile addProfile(Profile profile) {
        String sql = """
                    INSERT INTO
                        profiles
                        (user_id, profile_img, bio)
                    VALUES
                        (?,?,?)
                    """;

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {

            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            statement.setInt(1, profile.getUserId());
            statement.setString(2, profile.getProfileImg());
            statement.setString(3, profile.getBio());

            return statement;
        }, keyHolder);

        int newId = keyHolder.getKey().intValue();

        return getProfile(newId);
    }

    @Override
    public boolean updateProfile(int profileId, Profile profile) {
        try
        {
            List<Object> sqlColumns = new ArrayList<>();
            StringBuilder sql = new StringBuilder("UPDATE profiles SET ");

            if (profile.getProfileImg() != null) {
                sql.append("profile_img = ?, ");
                sqlColumns.add(profile.getProfileImg());
            }
            if (profile.getBio() != null) {
                sql.append("bio = ?, ");
                sqlColumns.add(profile.getBio());
            }

            sql.setLength(sql.length() - 2);
            sql.append(" WHERE profile_id = ?;");
            sqlColumns.add(profileId);

            jdbcTemplate.update(sql.toString(), sqlColumns.toArray());
            return true;

        }
        catch(Exception e)
        {
            return false;
        }
    }

    @Override
    public boolean deleteProfile(int profileId) {
        var profileToDelete = getProfile(profileId);

        if(profileToDelete != null)
        {
            String sql = """
                DELETE FROM profiles
                WHERE profile_id = ?
                """;
            jdbcTemplate.update(sql, profileId);

            return true;
        }
        return false;
    }

    public static class ProfileRowMapper implements RowMapper<Profile>
    {

        @Override
        public Profile mapRow(ResultSet rs, int rowNum) throws SQLException {

            Profile profile = new Profile(
                    rs.getInt("profile_id"),
                    rs.getInt("user_id"),
                    rs.getString("username"),
                    rs.getString("profile_img"),
                    rs.getString("bio")
            );

            return profile;
        }
    }
}
